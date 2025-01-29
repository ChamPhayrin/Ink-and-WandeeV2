// NPM MODLES
const path = require("path");
const express = require("express");
const cors = require("cors");
const searchBooks = require("./utils/searchBooks");
const searchBooksByGenre = require("./utils/searchBooksByGenre");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("./dbconfig");
const { error } = require("console");
const { connect } = require("http2");

//Cors Config
const corsOptions = {
	origin: "*",
	credentials: true,
	optionSuccessStatus: 200,
};

// Express NPM
const app = express();

// LOCAL HOST PORT
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));




//Search Endpoints
app.get("/searchBooks", (req, res) => {
	const query = req.query.query;

	if (!query) return res.send({ error: "No search provided!" });

	searchBooks(query)
		.then((books) => res.send(books))
		.catch((error) => res.send("Error searching for books: " + error));
});

app.get("/searchBooksByGenre", (req, res) => {
	const query = req.query.query;

	if (!query) return res.send({ error: "No search provided!" });

	searchBooksByGenre(query)
		.then((books) => res.send(books))
		.catch((error) => res.send("Error searching for books: " + error));
});


//User Interaction End Points
app.post('/message', async (req, res) =>{
  const {user_id, fullname, email, subject, message} = req.body

  if (!fullname) return res.send({ error: "Please enter fullname" });
	if (!email) return res.send({ error: "Please enter email" });
	if (!subject) return res.send({ error: "Please enter subject" });
	if (!message) return res.send({ error: "Please enter message" });

  const insertQ = 'INSERT INTO user_messages (user_id, full_name, email, subject, message) VALUES (?, ?, ?, ?, ?)'

  connection.query(insertQ, [user_id || null, fullname, email, subject, message], (err, result) =>{
    if (err) return res.send({error: err});
    console.log('insert success')
    return res.send({success: 'insert successful'})
  })
  
})

app.post("/register", async (req, res) => {
	const { username, firstname, lastname, email, password } = req.body;

  if (!username) return res.send({error: "Please enter a username"})
	if (!password) return res.send({ error: "Please enter password" });
	if (!email) return res.send({ error: "Please enter email" });
	if (!firstname) return res.send({ error: "Please enter first name" });
	if (!lastname) return res.send({ error: "Please enter last name" });

	const hashedPassword = await bcrypt.hash(password, 10);

	const insertQ =
		"INSERT INTO users (username, first_name, last_name, email, hashed_password) VALUES (?, ?, ?, ?, ?)";

	const selectEmailQ = `SELECT email FROM users WHERE email = '${email}'`;
	const selectUsernameQ = `SELECT username FROM users WHERE username = '${username}'`;


	const values = [username, firstname, lastname, email, hashedPassword];

	connection.query(selectEmailQ, (err, result) => {
		if (err) throw err;
		if (result.length > 0) {
			return res.send({ error: "Email in use!" });
		} else {
      connection.query(selectUsernameQ, (err, result) => {
        if (err) throw err;
        if(result.length > 0) {
          return res.send({ error: "Username is taken!" })
        } else {
          connection.query(insertQ, values, (err, result) => {
            if (err) throw err;
            return res.send({ success: "Success!" });
          });
        }
      })
		}
	});
});

app.post("/signin", (req, res) => {
	const { password, username } = req.body;

	if (!username) return res.send({ error: "Please enter username" });
	if (!password) return res.send({ error: "Please enter password" });

	const selectUsernameQ = `SELECT username, hashed_password, first_name, last_name, user_id, email, is_admin FROM users WHERE username = ?`;

	connection.query(selectUsernameQ, [username], (err, result) => {
		if (err) throw err;

		if (result.length > 0) {
			const user = result[0];

			// Compare the provided password with the hashed password in the database
			bcrypt.compare(password, user.hashed_password, (err, isMatch) => {
				if (err) throw err;

				if (!isMatch) {
					return res.send({ error: "Password is incorrect" });
				} else {
					// Generate JWT
					const token = jwt.sign(
						{
							user_id: user.user_id,
							username: user.username,
							is_admin: user.is_admin,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email
						},
						"your_secret_key", // Replace with your secret key
						{ expiresIn: "1h" } // Token expiration time
					);

					// Send user data and token
					return res.send({
						userData: {
							username: user.username,
							first_name: user.first_name,
							last_name: user.last_name,
							email: user.email,
							is_admin: user.is_admin,
						},
						token,
					});
				}
			});
		} else {
			return res.send({ error: "No account with the provided username" });
		}
	});
});


app.get('/bookProducts', (req, res) => {
  const selectQ = 'SELECT * FROM products';

  connection.query(selectQ, (err, result) =>{
    res.send(result)
  })

})

//Cart & Wishlist End Points
app.post('/addCart', (req, res) => {
  const book = req.body.book;
  const user_id = req.body.user_id;

  const findBook = `SELECT product_id FROM products WHERE title = ?`;
  const inDB = 'SELECT product_id from cart WHERE product_id = ? AND user_id = ?'

  connection.query(inDB, [book.product_id, user_id], (err, result) => {
    if(result.length > 0) {return res.send({error: 'Already in cart'})}
    else {
      connection.query(findBook, [book.title], (err, result) => {
        if (err) throw err;
    
        if (result.length > 0) {
          const insertQ = `INSERT INTO cart (user_id, product_id) VALUES (?, ?)`;
          connection.query(insertQ, [user_id, result[0].product_id], (err) => {
            if (err) throw err;
          });
        } else {
          const insertQ = `INSERT INTO products (title, description, author, cover_img, publish_date, retail_price, genre) VALUES (?, ?, ?, ?, ?, ?, ?)`;
          connection.query(insertQ, [book.title, book.description, book.author, book.cover_img, book.publish_date, book.retail_price, book.genre], (err, result) => {
            if (err) throw err;
            const insertCartQ = `INSERT INTO cart (user_id, product_id) VALUES (?, ?)`;
            connection.query(insertCartQ, [user_id, result.insertId], (err) => {
              if (err) throw err;
            });
          });
        }
      });
    }
  })

});

app.post('/getCart', (req, res) =>{
  const user_id = req.body.user_id;

  const selectCartQ = 'SELECT c.user_id, p.* FROM cart c INNER JOIN products p ON c.product_id = p.product_id WHERE c.user_id = ?'

  connection.query(selectCartQ, [user_id], (err, result) =>{
    if (err) throw err
    if(result.length>0){
      res.send({result})
    }
  })


})

app.post('/deleteCart', (req, res) => {
  const book = req.body.book;
  const user_id = req.body.user_id;

  const findInCart = 'SELECT cart_id FROM cart WHERE product_id = ? AND user_id = ?';
  const deleteFromCart = 'DELETE FROM cart WHERE cart_id = ?';

  connection.query(findInCart, [book.product_id, user_id], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      const cartId = result[0].cart_id;

      connection.query(deleteFromCart, [cartId], (err) => {
        if (err) throw err;
      });
    } else {
      return res.send({ error: 'Book was not in cart' });
    }
  });

});

app.post('/savedProducts', (req, res) => {
  const book = req.body.book;
  const user_id = req.body.user_id;

  const findBook = `SELECT product_id FROM products WHERE title = ?`;
  const inDB = 'SELECT product_id FROM saved_products WHERE product_id = ? AND user_id = ?'

  connection.query(inDB, [book.product_id, user_id], (err, result) => {
    if(result.length > 0) {return res.send({error: 'Already saved'})}
    else {
      connection.query(findBook, [book.title], (err, result) => {
        if (err) throw err;
    
        if (result.length > 0) {
          const insertQ = `INSERT INTO saved_products (user_id, product_id) VALUES (?, ?)`;
          connection.query(insertQ, [user_id, result[0].product_id], (err) => {
            if (err) throw err;
          });
        } else {
          const insertQ = `INSERT INTO products (title, description, author, cover_img, publish_date, retail_price, genre) VALUES (?, ?, ?, ?, ?, ?, ?)`;
          connection.query(insertQ, [book.title, book.description, book.author, book.cover_img, book.publish_date, book.retail_price, book.genre], (err, result) => {
            if (err) throw err;
            const insertSavedQ = `INSERT INTO saved_products (user_id, product_id) VALUES (?, ?)`;
            connection.query(insertSavedQ, [user_id, result.insertId], (err) => {
              if (err) throw err;
            });
          });
        }
      });
    }
  })

});

app.post('/deleteSaved', (req, res) => {
  const book = req.body.book;
  const user_id = req.body.user_id;

  const findInSaved = 'SELECT saved_product_id FROM saved_products WHERE product_id = ? AND user_id = ?';
  const deleteFromSaved = 'DELETE FROM saved_products WHERE saved_product_id = ?';

  connection.query(findInSaved, [book.product_id, user_id], (err, result) => {
    if (err) throw err; 

    if (result.length > 0) {
      const savedId = result[0].saved_product_id; 

      connection.query(deleteFromSaved, [savedId], (err) => {
        if (err) throw err; 
      });
    } else {
      res.send({ error: 'Book was not saved' }); 
    }
  });
});


app.post('/getWishlist', (req, res) =>{
  const user_id = req.body.user_id;

  const selectQ = `SELECT s.user_id, p.* FROM saved_products s INNER JOIN products p ON s.product_id = p.product_id WHERE s.user_id = ?`


  connection.query(selectQ, [user_id], (err, result) =>{
    if (err) throw err;
    if(result.length > 0){
      res.send({result})
    }
  })
})


//Admin End Points
app.get('/getAllUsers', (req, res) => {
  const selectQ = 'SELECT * FROM users'

  connection.query(selectQ, (err, result) => {
    if(err) return res.send({error: err})
    return res.send({result})
  })
})

app.get('/getMessages', (req, res) => {
  const selectQ = 'SELECT * FROM user_messages'

  connection.query(selectQ, (err, result) => {
    if(err) return res.send({error: err})
    return res.send({result})
  })
})

app.post('/deleteUser', (req, res) => {
  const { user } = req.body
  
  const deleteQuery = `DELETE FROM users WHERE (user_id = '${user.user_id}')`

  connection.query(deleteQuery, (err, result) => {
    if(err) return res.send({error: err})
    return res.send({success: 'Successfully deleted user.'})
  })
})


// CHECK SERVER IS UP
app.listen(port, () => {
	console.log("server is up!");
});
