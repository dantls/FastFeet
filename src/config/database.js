module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'master',
  database: 'fastfeed',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
