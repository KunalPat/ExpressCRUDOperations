
        //var user = $.get('localhost:3000/api/users')
        //const data = $('form#SubmitData')[0].serialize();
        $(function(){
            $("#userData").validate({
                rules: {
                    // The key name on the left side is the name attribute
                    // of an input field. Validation rules are defined
                    // on the right side
                    fName: "required",
                    lName: "required",
                    email: {
                        required: true,
                        // Specify that email should be validated
                        // by the built-in "email" rule
                        email: true
                    },
                    phoneNumber: {
                        required: true,
                        minlength: 10
                    },
                    status: "required"
                },
                focusCleanup: true,
                // Specify validation error messages
                messages: {
                    firstname: "Please enter your firstname",
                    lastname: "Please enter your lastname",
                    phoneNumber: {
                        required: "Please provide a phone number",
                        minlength: "Your password must be 10 characters long"
                    },
                    email: "Please enter a valid email address",
                    status: "Please enter the contact status"
                },
                errorPlacement: function(error, element) {
                    if (element.attr("name") == "status"){
                        error.insertAfter(element.parent().siblings());
                    }else{
                        error.insertAfter(element);
                    }
                }
            });
        });

        function SubmitData() {
            var validator = $( "#userData" ).validate();
            validator.resetForm();
            if($("#userData").valid()){
                $.ajax({
                    type:"POST",
                    data: $('#userData').serialize() ,
                    url:'http://localhost:3000/api/users',
                    success:(res)=>{
                        console.log(res);
                        //makeTable(res);
                    },
                    complete: function (response) {
                        $('#output').html(response.responseText);
                        $('#userData')[0].reset();
                        $('#userData input[type=radio]').attr('checked',false);
                    },
                    error: function () {
                        $('#output').html('Bummer: there was an error!');
                    },
                });
            }
            else{
                $('#output').html('Fill all the records of the form .');
            }
            
        }

        function getList() {
            var validator = $( "#userData" ).validate();
            validator.resetForm();
            $.ajax({
                type:"GET",
                url:'http://localhost:3000/api/users',
                complete: function (response) {
                    console.log();
                    if(response.responseJSON == undefined){
                        $('#output').html(response.responseText);
                    }else{
                        $('#output').html('');
                    }
                    
                    $(response.responseJSON).each(function(i,val){
                        console.log(val);
                        var contactCard = '<div class="contactCard"><p class="name"><span class="firstName">'+val.fName+'</span> <span class="lastName">'+val.lName+'</span></p><p class="email">'+val.email+'</p>'+
                        '<p class="phoneNumber">'+val.phoneNumber+'</p><div class="Button"><input type="button" value="Edit" class="marLeft10" onclick="EditData(this)"/></div>'+
                        '<div class="Button marLeft10"><input type="button" value="Delete" class="marLeft10" onclick="DeleteData(this)"/></div><p class="status">'+val.status+'</p></div>';
                        $('#output').append(contactCard);
                    });
                    //$('#output').html(response.responseText);
                },
                error: function () {
                    $('#output').html('Bummer: there was an error!');
                },
            });
            return false;
        }
        function EditData(e){
            window.scrollTo(0,0)
            var parentElement = $(e).parents('.contactCard');
            $('#userData')[0].elements[1].value = $(parentElement).find('.firstName').html().trim();;
            $('#userData')[0].elements[2].value = $(parentElement).find('.lastName').html().trim();
            $('#userData')[0].elements[3].value = $(parentElement).find('.email').html().trim();
            $('#userData')[0].elements[4].value = $(parentElement).find('.phoneNumber').html().trim();
            var statusId = $(parentElement).find('.status').html().trim();
            $('input#'+statusId).attr('checked','true');

        }
        function UpdateData(val) {
            var validator = $( "#userData" ).validate();
            validator.resetForm();
            console.log(val);
            if($("#userData").valid()){
                $.ajax({
                    type:"PUT",
                    data: $('#userData').serialize() ,
                    url:'http://localhost:3000/api/users',
                    complete: function (response) {
                        $('#output').html(response.responseText);
                        $('#userData')[0].reset();
                        $('#userData input[type=radio]').attr('checked',false);
                    },
                    error: function () {
                        $('#output').html('Bummer: there was an error!');
                    },
                });
            }
            else{
                $('#output').html('Fill First Name to search for record and update .');
            }
            return false;
        }

        function DeleteData(e) {
            if($(e).parents('.contactCard').length != 0){
                var parentElement = $(e).parents('.contactCard');
                $('#userData')[0].elements[3].value = $(parentElement).find('.email').html().trim();
                $('#userData')[0].elements[4].value = $(parentElement).find('.phoneNumber').html().trim();
            }
            if($('#userData')[0].elements[3].checkValidity() && $('#userData')[0].elements[4].checkValidity()){
                $.ajax({
                    type:"DELETE",
                    data: $('#userData').serialize() ,
                    url:'http://localhost:3000/api/users',
                    complete: function (response) {
                        console.log($(this));
                        $('#output').html(response.responseText);
                        $('#userData')[0].reset();
                        $('#userData input[type=radio]').attr('checked',false);
                    },
                    error: function () {
                        $('#output').html('Bummer: there was an error!');
                    },
                });
            }
            else{
                $('#output').html('Fill First Name to search for record and delete .');
            }
            return false;
        }