package models

import play.api.libs.functional.syntax.{toFunctionalBuilderOps, unlift}
import play.api.libs.json.{JsPath, Reads, Writes}

case class Item(id: Long, name: String, address: String, lat: Double, lon: Double, rubric: String)

object Item {
  implicit val ItemReads: Reads[Item] = (
    (JsPath \ "id").read[Long] and
      (JsPath \ "name").read[String] and
      (JsPath \ "address").read[String] and
      (JsPath \ "lat").read[Double] and
      (JsPath \ "lon").read[Double] and
      (JsPath \ "rubric").read[String]
    )(Item.apply _)

  implicit val ItemWrites: Writes[Item] = (
    (JsPath \ "id").write[Long] and
      (JsPath \ "name").write[String] and
      (JsPath \ "address").write[String] and
      (JsPath \ "lat").write[Double] and
      (JsPath \ "lon").write[Double] and
      (JsPath \ "rubric").write[String]
    )(unlift(Item.unapply))
}
