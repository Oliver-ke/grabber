const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { auth, deal, user } = require('./routes/index');
const { sequelize } = require('./database/models');
dotenv.config();
const app = express();

app.use(cors());

// Normal express config defaults
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const isProduction = process.env.NODE_ENV || 'production';

app.use('/api/user', user);
app.use('/api/deal', deal);
app.use('/api/auth', auth);

// development error handler
// will print stacktrace
if (!isProduction) {
	app.use((err, req, res, next) => {
		// eslint-disable-next-line no-console
		console.log(err.stack);
		res.status(err.status || 500);
		res.json({
			errors: {
				message: err.message,
				error: err
			}
		});
	});
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

const PORT = process.env.PORT || 5000;
(async () => {
	await sequelize.sync();
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
