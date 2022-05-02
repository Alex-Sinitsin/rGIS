package modules

import com.google.inject.Inject
import play.api.Configuration
import play.api.libs.ws.{WSClient, WSRequest, WSResponse}

import scala.concurrent.Future
import scala.concurrent.duration.DurationInt

/** *
  * 2GIS Map API
  */
class MapAPIModule @Inject()(playConfig: Configuration, ws: WSClient) {
  val apiKey: String = playConfig.underlying.getString("mapApiKey")

  def getCompaniesInformation(qType: String): Future[WSResponse] = {
    val initialParams: ((String, String), (String, String), (String, String), (String, String), (String, String), (String, String)) =
      Tuple6(
        ("q" -> ""),
        ("city_id" -> "1267260165455895"),
        ("district_id" -> "1267247280553988,1267247280553987"),
        ("rubric_id" -> "161,164,13796"),
        ("fields" -> "items.point,items.rubrics"),
        ("key" -> apiKey)
      )

    val request: WSRequest =
      ws.url("https://catalog.api.2gis.com/3.0/items")
        .addHttpHeaders("Accept" -> "application/json")
        .withRequestTimeout(5000.millis)

    val complexRequest: WSRequest =
      if (qType == "Рестораны") {
        val queryParams = initialParams.copy(_1 = ("q" -> "Рестораны"))
        println(queryParams)
        request.addQueryStringParameters(
          queryParams._1,
          queryParams._2,
          queryParams._3,
          queryParams._4,
          queryParams._5,
          queryParams._6,
        )
      } else if (qType == "Бизнес-центры") {
        val queryParams = initialParams.copy(_1 = ("q" -> "Бизнес-центры"))

        request.addQueryStringParameters(
          queryParams._1,
          queryParams._2,
          queryParams._3,
          queryParams._4,
          queryParams._5,
          queryParams._6,
        )
      }
      else {
        val queryParams = initialParams.copy(_1 = ("q" -> qType))

        request.addQueryStringParameters(
          queryParams._1,
          queryParams._2,
          queryParams._3,
          queryParams._4,
          queryParams._5,
          queryParams._6,
        )
      }
    complexRequest.get()
  }
}
