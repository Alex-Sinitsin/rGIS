package models.services

import models.daos.ItemDAO
import models.{GisItem, Item, Point, User}
import modules.MapAPIModule
import play.api.libs.ws.WSResponse

import java.util.UUID
import javax.inject.Inject
import scala.collection.mutable.ArrayBuffer
import scala.concurrent.{ExecutionContext, Future}

class ItemService @Inject()(itemDAO: ItemDAO, mapAPI: MapAPIModule)(implicit ex: ExecutionContext) {

  /**
    * Функция проверки роли "Администратор" пользователя
    *
    * @param currentUser Данные авторизованного пользователя
    * @return
    */
  private def isAdmin(currentUser: User): Boolean = {
    if (currentUser.role.contains("Admin")) true
    else false
  }

  /**
    * Извлекает список объектов
    *
    * @return
    */
  def retrieveAll: Future[List[Item]] = {
    val itemsInDB = itemDAO.getAll

    lazy val restaurants = mapAPI.getCompaniesInformation("Рестораны")
    lazy val businessCenters = mapAPI.getCompaniesInformation("Бизнес-центры")

    itemsInDB.flatMap(itemSeq => {
      if (itemSeq == Seq.empty) {
        saveItemsToDB(restaurants, businessCenters)
      } else itemsInDB
    })
  }

  /**
    * Сохранение информации в базу данных
    *
    * @param restaurants     - Массив объектов компаний типа "Рестораны"
    * @param businessCenters - Массив объектов компаний типа "Бизнес-центры"
    * @return Список объектов, добавленные в базу данных
    */
  def saveItemsToDB(restaurants: Future[WSResponse], businessCenters: Future[WSResponse]): Future[List[Item]] = {
    val itemListToSave = ArrayBuffer.empty[Item]
    val ArrayOfGisItems = ArrayBuffer.empty[GisItem]

    restaurants.flatMap(rstList => {
      businessCenters.flatMap(bsnList => {
        val rstResult = rstList.json.result.get("meta").result.get("code").toString()
        val bsnResult = rstList.json.result.get("meta").result.get("code").toString()

        if (rstResult == "200" && bsnResult == "200") {
          val rstItems = rstList.json.result.get("result").result.get("items").as[Array[GisItem]]
          val bsnItems = bsnList.json.result.get("result").result.get("items").as[Array[GisItem]]

          ArrayOfGisItems ++= rstItems ++ bsnItems

          ArrayOfGisItems.map(gItem => {
            itemListToSave += Item(UUID.randomUUID(), gItem.name, gItem.address_name, gItem.point.lat, gItem.point.lon, gItem.rubrics(0).name)
          })

          itemDAO.add(itemListToSave)
        } else Future.failed(new Error("Ошибка при получении информации о компаниях!"))
      })
    })
  }

  /**
    * Извлекает данные объекта по его ID
    *
    * @param id ID объекта
    * @return Данные объекта, иначе None
    */
  def retrieveByID(id: UUID): Future[Option[Item]] = itemDAO.getByID(id)

  /**
    * Удаляет объект
    *
    * @param itemID      ID объекта
    * @param currentUser Данные авторизованного пользователя
    * @return
    */
  def delete(itemID: UUID, currentUser: User): Future[ItemResult] = {
    if (isAdmin(currentUser)) {
      itemDAO.getByID(itemID).flatMap {
        case Some(_) => itemDAO.delete(itemID).flatMap { delResult =>
          if (delResult) Future.successful(ItemDeleted)
          else Future.successful(ItemDeleteError("Произошла ошибка при удалении объекта!"))
        }
        case None => Future.successful(ItemNotFound)
      }
    } else Future.successful(OperationForbidden)
  }
}


/**
  * Объекты, использующиеся для возврата рельтата
  */
sealed trait ItemResult

case object OperationForbidden extends ItemResult

case object ItemDeleted extends ItemResult

case object ItemNotFound extends ItemResult

case object ItemAlreadyExist extends ItemResult

case class ItemUpdated(item: Item) extends ItemResult

case class ItemCreated(item: Item) extends ItemResult

case class ItemDeleteError(msg: String) extends ItemResult