require('dotenv').config();
const express = require('express');
const connectDB = require('./server/database/db');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json()); 
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize()); // Initialize Passport
app.use(passport.session());  // Use sessions for persistent login sessions


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key');
  next();
});
app.use(cors({methods: 'GET, POST, PUT, DELETE, OPTIONS, PATCH'}));
app.use(cors({ origin: '*', credentials: true })); // Enable CORS for all origins
app.use(express.urlencoded({ extended: true }));


// Connect to DB
connectDB();

// 

// Passport GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},
 (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => {res.send(req.session.user !== undefined ? `Welcome ${req.session.user.username}` : ' unauthorize user login to have access ')}); // Home route

app.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login', session: true }),
  (req, res) => {
    res.redirect('/api-docs'); // Redirect to Swagger after login
  }
);


// Swagger API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/', require('./server/route/index'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
