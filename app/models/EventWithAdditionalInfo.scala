package models

import play.api.libs.json.{Json, OFormat}

case class EventWithAdditionalInfo(event: Event, orgUser: User, item: Item, members: Option[List[User]])

object EventWithAdditionalInfo {
  implicit val EventWithAdditionalInfoJsonFormat: OFormat[EventWithAdditionalInfo] = Json.format[EventWithAdditionalInfo]
}
