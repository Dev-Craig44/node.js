
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });
notifyCusty();

async function notifyCusty() {
  try {

    const customer = await getCustomer(1);
    if (customer.isGold) {
      const topMovies = await getTopMovies();
      console.log('Top movies: ', topMovies);
      await sendEmail(customer.email, topMovies)
    };

  } catch (err) {
    console.log(err.message);
  }

};

function getCustomer(id) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);  
  });
};

function getTopMovies(movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  });
};

function sendEmail(email, movies, callback) {
  return new Promise((resolve, reject)=> {
    setTimeout(() => {
      resolve(console.log('Email sent...'));
    }, 4000);
  });
};