import Sequelize, { Model } from 'sequelize';

class Package extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, { foreignKey: 'recipient_id' });
    this.belongsTo(models.File, { foreignKey: 'signature_id' });
    this.belongsTo(models.Courier, { foreignKey: 'courierman_id' });
  }
}

export default Package;
