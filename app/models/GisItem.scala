package models

import play.api.libs.functional.syntax.{toFunctionalBuilderOps, unlift}
import play.api.libs.json.{JsPath, Json, OFormat, Reads, Writes}

case class Point(lat: Double, lon: Double)
case class Ads(article: Option[String], text: Option[String])
case class Rubrics(alias: String, id: String, kind: String, name: String, parent_id: String, short_id: Int)

case class GisItem(address_comment: Option[String], address_name: String, ads: Option[Ads], id: String, name: String, point: Point, rubrics: Array[Rubrics], objType: String)

object Point {
  implicit val PointFormat: OFormat[Point] = Json.format[Point]}

object Ads {
  implicit val AdsFormat: OFormat[Ads] = Json.format[Ads]
}
object Rubrics {
  implicit val RubricsFormat: OFormat[Rubrics] = Json.format[Rubrics]
}

object GisItem {
  implicit val ItemReads: Reads[GisItem] = (
    (JsPath \ "address_comment").readNullable[String] and
      (JsPath \ "address_name").read[String] and
      (JsPath \ "ads").readNullable[Ads] and
      (JsPath \ "id").read[String] and
      (JsPath \ "name").read[String] and
      (JsPath \ "point").read[Point] and
      (JsPath \ "rubrics").read[Array[Rubrics]] and
      (JsPath \ "type").read[String]
    ) (GisItem.apply _)

  implicit val ItemWrites: Writes[GisItem] = (
    (JsPath \ "address_comment").writeNullable[String] and
      (JsPath \ "address_name").write[String] and
      (JsPath \ "ads").writeNullable[Ads] and
      (JsPath \ "id").write[String] and
      (JsPath \ "name").write[String] and
      (JsPath \ "point").write[Point] and
      (JsPath \ "rubrics").write[Array[Rubrics]] and
      (JsPath \ "type").write[String]
    ) (unlift(GisItem.unapply))
}
