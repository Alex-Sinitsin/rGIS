package models

import play.api.libs.functional.syntax.{toFunctionalBuilderOps, unlift}
import play.api.libs.json.{JsObject, JsPath, JsValue, Json, Reads, Writes}
import slick.jdbc.GetResult

import java.time.LocalDateTime
import java.util.UUID

case class Event(id: Long, title: String, startDateTime: LocalDateTime, endDateTime: LocalDateTime, orgUserId: UUID, itemId: UUID, description: Option[String])

object Event {
  implicit val EventReads: Reads[Event] = (
    (JsPath \ "id").read[Long] and
      (JsPath \ "title").read[String] and
      (JsPath \ "startDateTime").read[LocalDateTime] and
      (JsPath \ "endDateTime").read[LocalDateTime] and
      (JsPath \ "orgUserId").read[UUID] and
      (JsPath \ "itemId").read[UUID] and
      (JsPath \ "description").readNullable[String]
    )(Event.apply _)

  implicit val EventWrites: Writes[Event] = (
    (JsPath \ "id").write[Long] and
      (JsPath \ "title").write[String] and
      (JsPath \ "startDateTime").write[LocalDateTime] and
      (JsPath \ "endDateTime").write[LocalDateTime] and
      (JsPath \ "orgUserId").write[UUID] and
      (JsPath \ "itemId").write[UUID] and
      (JsPath \ "description").writeNullable[String]
    )(unlift(Event.unapply))

  implicit val getR: GetResult[Event] = GetResult(r => Event(r.nextLong(), r.nextString(), r.nextTimestamp().toLocalDateTime, r.nextTimestamp().toLocalDateTime, UUID.fromString(r.nextString()), UUID.fromString(r.nextString()), r.nextStringOption()))
}