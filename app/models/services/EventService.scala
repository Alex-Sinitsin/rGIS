package models.services

import forms.EventForm.EventData
import models.{Event, EventMember, User}
import models.daos.EventDAO

import java.time.{Duration, LocalDateTime}
import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class EventService @Inject()(eventDAO: EventDAO)(implicit ex: ExecutionContext) {

  /**
    * Извлекает список событий
    *
    * @return
    */
  def retrieveAll: Future[Seq[Event]] = eventDAO.getAll

  /**
    * Функция обрабатывает дату и время окончания события
    *
    * Если время, например, 13:00, то от него отнимается 1 минута и возвращается 12:59, иначе возвращается необработанное время
    *
    * @param dateTime Дата и время, необходимое для обработки
    * @return Обработанные дата и время
    */
  private def newEventDateTimeBuilder(dateTime: LocalDateTime): LocalDateTime = {
    dateTime.getMinute match {
      case 0 => dateTime.minus(Duration.ofMinutes(1))
      case _ => dateTime
    }
  }

  /**
    * Извлекает даные о событии
    *
    * @param eventID ID события
    * @return
    */
  def getEventByID(eventID: Long): Future[Option[Event]] = {
    eventDAO.getByID(eventID)
  }

  /**
    * Метод сохраняет новое событие
    *
    * @param eventData Данные с формы
    * @return Добавленное событие
    */
  def saveEvent(eventData: EventData): Future[EventResult] = {
    val members: List[UUID] = eventData.members.getOrElse(List[String]()).map(UUID.fromString)

    val newEndDateTime: LocalDateTime = newEventDateTimeBuilder(eventData.endDateTime)

    val compareDateTimeValue = eventData.startDateTime compareTo eventData.endDateTime

    if (compareDateTimeValue > 0) Future.successful(InvalidEndDate)
    else if (compareDateTimeValue == 0) Future.successful(DateTimeEqualException)
    else {
      eventDAO.getByDateTime(eventData.startDateTime, eventData.endDateTime).flatMap {
        case Some(_) => Future.successful(EventAlreadyExists)
        case None =>
          val eventMembers: List[EventMember] = List.empty[EventMember]

          for {
            createdEvent <-
              eventDAO.add(Event(-1, eventData.title, eventData.startDateTime, newEndDateTime, UUID.fromString(eventData.orgUserID), eventData.itemID, eventData.description))
            listOfEventMembers = members.flatMap(id => {
              EventMember(id, createdEvent.id) :: eventMembers
            })
            _ <- eventDAO.addEventMembers(listOfEventMembers)
          } yield EventCreated(createdEvent)
      }
    }
  }

  /**
    * Фрагмент кода для обновления события
    *
    * @param eventID        ID события
    * @param eventData      Данные о событии
    * @param newEndDateTime Обработанные дата и время окончания события
    * @return Результат выполнения операции и событие, которое было обновлено
    */
  private def updateEventFunction(eventID: Long, eventData: EventData, newEndDateTime: LocalDateTime, currentUser: User): Future[EventResult] = {
    if (currentUser.id == UUID.fromString(eventData.orgUserID) || currentUser.role.contains("Admin")) {
      val lstMb = List.empty[EventMember]
      val membersFormData: List[UUID] = eventData.members.getOrElse(List[String]()).map(UUID.fromString)
      for {
        updatedEvent <- eventDAO.update(Event(eventID, eventData.title, eventData.startDateTime, newEndDateTime, UUID.fromString(eventData.orgUserID), eventData.itemID, eventData.description))
        _ <- eventDAO.deleteEventMembers(eventID)
        members = membersFormData.flatMap(userID => EventMember(userID, eventID) :: lstMb)
        _ <- eventDAO.addEventMembers(members)
      } yield EventUpdated(updatedEvent)
    }
    else Future.successful(EventCreatedByAnotherUser("update"))
  }

  /**
    * Обрабатывает обновления данных события
    *
    * @param eventID     ID события
    * @param eventData   Данные о событии
    * @param currentUser Объект данных авторизованного пользователей
    * @return Результат выполнения операции и событие, которое было обновлено
    */
  def updateEvent(eventID: Long, eventData: EventData, currentUser: User): Future[EventResult] = {

    updateEventFunction(eventID, eventData, LocalDateTime.now(), currentUser)

        val newEndDateTime: LocalDateTime = newEventDateTimeBuilder(eventData.endDateTime)

        val compareDateTimeValue = eventData.startDateTime compareTo eventData.endDateTime

        if (compareDateTimeValue > 0) Future.successful(InvalidEndDate)
        else if (compareDateTimeValue == 0) Future.successful(DateTimeEqualException)
        else {
          eventDAO.getByID(eventID).flatMap {
            case Some(eventWithID) =>
              if (eventWithID.startDateTime != eventData.startDateTime && eventWithID.endDateTime != eventData.endDateTime) {
                eventDAO.getByDateTime(eventData.startDateTime, eventData.endDateTime).flatMap {
                  case Some(eventWithDateTime) =>
                    if (eventWithDateTime.id == eventID)
                      updateEventFunction(eventID, eventData, newEndDateTime, currentUser)
                    else Future.successful(EventAlreadyExists)
                  case None => updateEventFunction(eventID, eventData, newEndDateTime, currentUser)
                }
              } else updateEventFunction(eventID, eventData, newEndDateTime, currentUser)
            case None => Future.successful(EventNotFound)
          }
        }
  }

  /**
    * Обрабатывает удаление данных события
    *
    * @param eventID     ID события, которое необходимо удалить
    * @param currentUser Объект данных авторизованного пользователя
    * @return Результат выполнения операции
    */
  def deleteEvent(eventID: Long, currentUser: User): Future[EventResult] = {
    eventDAO.getByID(eventID).flatMap {
      case Some(eventData) =>
        if (currentUser.id == eventData.orgUserId || currentUser.role.contains("Admin")) {
          eventDAO.delete(eventID).flatMap { eventID => {
            eventDAO.deleteEventMembers(eventID)
            Future.successful(EventDeleted(eventID))
          }}
        } else Future.successful(EventCreatedByAnotherUser("delete"))
      case None => Future.successful(EventNotFound)
    }
  }
}

/**
  * Объекты, использующиеся для возврата рельтата
  */
sealed trait EventResult

case object InvalidEndDate extends EventResult

case object DateTimeEqualException extends EventResult

case object EventAlreadyExists extends EventResult

case object EventNotFound extends EventResult

case class EventDeleted(eventID: Long) extends EventResult

case class EventCreated(event: Event) extends EventResult

case class EventCreatedByAnotherUser(action: String) extends EventResult

case class EventUpdated(event: Event) extends EventResult
