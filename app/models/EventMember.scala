package models

import play.api.libs.functional.syntax.{toFunctionalBuilderOps, unlift}
import play.api.libs.json.{JsPath, Reads, Writes}

import java.util.UUID

case class EventMember(userID: UUID, eventID: Long)

object EventMember {
  implicit val EventMembersReads: Reads[EventMember] = (
    (JsPath \ "userID").read[UUID] and
      (JsPath \ "eventID").read[Long]
    )(EventMember.apply _)

  implicit val EventMembersWrites: Writes[EventMember] = (
    (JsPath \ "userID").write[UUID] and
      (JsPath \ "eventID").write[Long]
    )(unlift(EventMember.unapply))
}

