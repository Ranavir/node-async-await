const users = [{
  id:1,
  name:'Andrew',
  schoolId:101
},
{
  id:2,
  name:'Jessica',
  schoolId:999
}];

const grades = [{
  id:1,
  schoolId:101,
  grade:86
},
{
  id:2,
  schoolId:999,
  grade:100
},
{
  id:3,
  schoolId:101,
  grade:80
}];

const getGrades = (schoolId) =>{
  return new Promise((resolve,reject) => {
      resolve(grades.filter((grade) => grade.schoolId === schoolId));
  });
};

// getGrades(102).then((grades) =>{
//   console.log(grades);
// }).catch((err) =>{
//   console.log(err);
// });

const getUser = (id) =>{
  return new Promise((resolve,reject)=>{
      const user = users.find((user) => user.id === id);
      if(user){
        resolve(user);
      }else{
        reject(`Unable to find user with id ${id}`);
      }
  });
};

// getUser(3).then((user) =>{
//   console.log(user);
// }).catch((err) =>{
//   console.log(err);
// });

//To Print "Andrew has 83% in the class"
var getStatus = (id) =>{
  let user;
  return getUser(id).then((tempUser) => {
    user = tempUser;
    return getGrades(user.schoolId);
  }).then((grades) => {
    let average = 0;
    if(grades.length > 0){
      // console.log(grades.map((grade) => grade.grade).reduce((a,b) => a+b));
      average = grades.map((grade) => grade.grade).reduce((a,b) => a+b) / grades.length;
    }
    return `${user.name} has ${average}% in the class.`;
  });
};
// getStatus(1).then((status) => {
//   console.log(status);
// }).catch((err) => {
//   console.log(err);
// });


const getStatusAlt = async (userId) => {
  var user = await getUser(userId);
  var grades = await getGrades(user.schoolId);

  let average = 0;
  if(grades.length > 0){
    // console.log(grades.map((grade) => grade.grade).reduce((a,b) => a+b));
    average = grades.map((grade) => grade.grade).reduce((a,b) => a+b) / grades.length;
  }
  return `${user.name} has ${average}% in the class.`;
};
getStatusAlt(1).then((status) => {
  console.log(status);
}).catch((err) => {
  console.log(err);
});
