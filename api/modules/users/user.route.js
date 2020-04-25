const router = require('express').Router();
console.log("user routes");
var users = [{fName: "Deepa",lName: "Singh",email:"deepa@abc.com", phoneNumber: "1234567890", status: 'InActive'}];
router.post('/',(req,res) =>{
    const duplicate = users.find((user)=>{
        return user.email === req.body.email || user.phoneNumber === req.body.phoneNumber
    });
    if(duplicate){
        res.status(201).send("Email and Phone Number already exists");
    }
    else{
        users.push(req.body);
        //console.log("data inserted");
        res.status(201).send("New Record Added");
    }
    //console.log(req.body);
});
router.put('/',(req,res)=>{
    const duplicate = users.find((user)=>{
        if (user.email === req.body.email || user.phoneNumber === req.body.phoneNumber){
            user.lName = req.body.lName;
            user.fName = req.body.fName;
            user.email = req.body.email;
            user.status = req.body.status;
            user.phoneNumber = req.body.phoneNumber
            return user;
        }
    });
    console.log(duplicate);
    if(duplicate){
        res.status(201).send("Record Updated");
    }
    else{
        users.push(req.body);
        //console.log("data inserted");
        res.status(201).send("New Record Added");
    }
    console.log(req.body);
});
router.delete('/',(req,res)=>{
    //users = users.filter((item) => item.fName != req.body.fName);
    userDeleted = users.filter((item) => item.email === req.body.email && item.phoneNumber === req.body.phoneNumber);
    console.log(userDeleted);
    if(userDeleted.length == 1){
        res.status(201).send("Record Deleted");
        users = users.filter((item) => item.fName != req.body.fName);
    }else{
        res.status(201).send("No Record Deleted");
    }
});
/*router.get('/',(req,res)=>{
    
        res.status(200).send(users);

});*/

router.get('/',(req,res)=>{
    if (users.length >0){
        res.status(200).send(users);
    }
    else{
        res.status(201).send("No Records Found");
    }
});
console.log("user routes ends");
module.exports = router;
