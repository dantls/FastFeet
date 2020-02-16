import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        street_complement: Sequelize.STRING,
        number: Sequelize.INTEGER,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        zip_code: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Order, { foreignKey: 'recipient_id' });
  }
}

export default Recipient;
