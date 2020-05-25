const persistUserInLS = (user) => {
  if (localStorage) {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

const removeUserFromLS = () => {
  if (localStorage) {
    localStorage.removeItem("user");
  }
};

const makeRandomToken = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const persistTokenInLs = (userAvailable) => {
  if (localStorage) {
    localStorage.setItem("token", makeRandomToken(15));
  }
};
const login = (credentials) => {
  let data = JSON.parse(localStorage.getItem("user"));
  let email = data.email;
  let password = data.password;
  return new Promise((resolve, reject) => {
    if (credentials) {
      if (credentials.email == email && credentials.password == password) {
        resolve(credentials);
        persistTokenInLs(persistUserInLS(credentials));
      } else {
        alert("you did not enter the correct credentials");
      }
    } else {
      reject({ error: "You did not supply the credentials" });
    }
  });
};

//mock register
const register = (credentials) => {
  return new Promise((resolve, reject) => {
    if (credentials) {
      persistUserInLS(credentials);
      resolve(credentials);
      persistTokenInLs(persistUserInLS(credentials));
    } else {
      reject({ error: "You did not supply the credentials" });
    }
  });
};

// export const logout = () => {
//   removeUserFromLS();
// };

export default {
  login,
  register,
};
