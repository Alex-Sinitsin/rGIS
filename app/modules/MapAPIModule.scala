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
    val queryParams: ((String, String), (String, String), (String, String), (String, String), (String, String), (String, String)) =
      Tuple6(
        "q" -> qType,
        "city_id" -> "1267260165455895",
        "district_id" -> "1267247280553988,1267247280553987",
        "rubric_id" -> "161,164,13796",
        "fields" -> "items.point,items.rubrics",
        "key" -> apiKey
      )

    val complexRequest: WSRequest =
      ws.url("https://catalog.api.2gis.com/3.0/items")
        .addHttpHeaders("Accept" -> "application/json")
        .addQueryStringParameters(
          queryParams._1,
          queryParams._2,
          queryParams._3,
          queryParams._4,
          queryParams._5,
          queryParams._6,
        )
        .withRequestTimeout(5000.millis)


    complexRequest.get()
  }
}
