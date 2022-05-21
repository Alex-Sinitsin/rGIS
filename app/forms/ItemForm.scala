package forms

import models.Item
import play.api.data.Form
import play.api.data.Forms._

import java.util.UUID

object ItemForm {

  /**
   * Форма Play Framework.
   */
  val form: Form[Item] = Form(
    mapping(
      "id" -> ignored(UUID.randomUUID()),
      "name" -> nonEmptyText,
      "address" -> nonEmptyText,
      "lat" -> ignored(0.0),
      "lon" -> ignored(0.0),
      "rubric" -> nonEmptyText()
    )(Item.apply)(Item.unapply)
  )
}
