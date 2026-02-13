import bcrypt from "bcrypt";
const saltRounds = 12;

//function to hash our password
export async function genHashPassword(password) {
  try {
    //generate salt and hash together
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (err) { 
    console.log("\nerror occured while hashing password",err);
  }
}

// basically this checkuser function is dependent on the genHashPassword function, it first generates a new hash using password that has been passed in and then compares the results to export a boolean either true or false
export async function compareHashedPassword(password, hashPassword) {
  const match = await bcrypt.compare(password, hashPassword);
  return match;
}
