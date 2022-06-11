package models.daos

import com.google.inject.Inject
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.{ExecutionContext, Future}
import models.Item

import java.util.UUID
import scala.collection.mutable.ArrayBuffer

class ItemDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) extends DatabaseDAO {

  /**
   * Извлекает список всех объектов из таблицы
   *
   * @return Список объектов
   */
  def getAll: Future[List[Item]] = {
    db.run(items.sortBy(_.name.asc).result.map(_.toList))
  }

  /**
   * Производит выборку объекта по его ID
   *
   * @param itemID ID объектаб который необходимо получить
   * @return Найденный объект, иначе None
   */
  def getByID(itemID: UUID): Future[Option[Item]] = {
    db.run(items.filter(_.id === itemID).result.headOption)
  }


  /**
   * Производит выборку объекта по его имени
   *
   * @param name Имя объектаб который необходимо получить
   * @return Найденный объект, иначе None
   */
  def getByName(name: String): Future[Option[Item]] = {
    db.run(items.filter(_.name === name).result.headOption)
  }

  /**
   * Добавление нового объекта
   *
   * @param itemsArray Массив объектов для добавления
   * @return Массив объектов, который был добавлен
   */
  def add(itemsArray: ArrayBuffer[Item]): Future[List[Item]] =
    db.run(items ++= itemsArray).map(_ => itemsArray.toList)

  /**
   * Обновляет данные объекта
   *
   * @param item Объект для обновления
   * @return Объект, который был обновлен
   */
  def update(itemID: UUID, item: Item): Future[Item] =
    db.run(items.filter(_.id === itemID).map(itm => (itm.name, itm.address)).update((item.name, item.address))).map(_ => item)

  /**
   * Удаляет данные объекта
   *
   * @param itemID ID объекта
   * @return
   */
  def delete(itemID: UUID): Future[Boolean] =
    db.run(items.filter(_.id === itemID).delete).map(_ > 0)
}
