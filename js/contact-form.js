// JavaScript Document
$(document).ready(function() {

    "use strict";

    $(".contact-form").submit(function(e) {
        e.preventDefault();
        var name = $(".name");
        var email = $(".email");
        var phone = $(".phone");
        var patient = $(".patient");
        var subject = $(".subject");
        var msg = $(".message");
        var flag = false;

        if (name.val() == "") {
            name.closest(".form-control").addClass("error");
            name.focus();
            flag = false;
            return false;
        } else {
            name.closest(".form-control").removeClass("error").addClass("success");
        } if (email.val() == "") {
            email.closest(".form-control").addClass("error");
            email.focus();
            flag = false;
            return false;
        } else {
            email.closest(".form-control").removeClass("error").addClass("success");
        } if (phone.val() == "") {
            phone.closest(".form-control").addClass("error");
            phone.focus();
            flag = false;
            return false;
        } else {
            phone.closest(".form-control").removeClass("error").addClass("success");
        } if (patient.val() == "") {
            patient.closest(".form-control").addClass("error");
            patient.focus();
            flag = false;
            return false;
        } else {
            patient.closest(".form-control").removeClass("error").addClass("success");
        } if (subject.val() == "") {
            subject.closest(".form-control").addClass("error");
            subject.focus();
            flag = false;
            return false;
        } else {
            subject.closest(".form-control").removeClass("error").addClass("success");
        } if (msg.val() == "") {
            msg.closest(".form-control").addClass("error");
            msg.focus();
            flag = false;
            return false;
        } else {
            msg.closest(".form-control").removeClass("error").addClass("success");
            flag = true;
        }

        var dataString = "name=" + name.val() + "&email=" + email.val() + "&phone=" + phone.val() + "&patient=" + patient.val() + "&subject=" + subject.val() + "&msg=" + msg.val();

        $(".loading").fadeIn("slow").html("Loading...");

        $.ajax({
            type: "POST",
            data: dataString,
            url: "php/contactForm.php",
            cache: false,
            success: function (d) {
                $(".form-control").removeClass("success");

                if(d == 'success')
                    $('.loading').fadeIn('slow').html('<font color="#48af4b">Mail sent Successfully.</font>').delay(3000).fadeOut('slow');
                else
                    $('.loading').fadeIn('slow').html('<font color="#ff5607">Mail not sent.</font>').delay(3000).fadeOut('slow');
            }
        });

        return false;
    });


    $("#reset").on('click', function() {
        $(".form-control").removeClass("success").removeClass("error");
    });


    /*----------------------------------------------------*/
    /*  Career Form
    /*  Uses this existing shared contact-form.js file.
    /*----------------------------------------------------*/

    $(".career-form").submit(function(e) {

        e.preventDefault();

        var form = this;
        var $form = $(form);
        var loading = $form.find(".loading");
        var resume = $form.find(".resume")[0];

        var firstName = $form.find(".first-name");
        var lastName = $form.find(".last-name");
        var email = $form.find(".email");
        var phone = $form.find(".phone");
        var interest = $form.find(".interest");

        if (firstName.val() == "") {
            firstName.addClass("error").focus();
            return false;
        }

        if (lastName.val() == "") {
            lastName.addClass("error").focus();
            return false;
        }

        if (email.val() == "") {
            email.addClass("error").focus();
            return false;
        }

        if (phone.val() == "") {
            phone.addClass("error").focus();
            return false;
        }

        if (interest.val() == "") {
            interest.addClass("error").focus();
            return false;
        }

        if (!resume || resume.files.length === 0) {
            loading.fadeIn("slow").html('<font color="#ff5607">Please attach your resume.</font>');
            return false;
        }

        var file = resume.files[0];

        var allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if ($.inArray(file.type, allowedTypes) === -1) {
            loading.fadeIn("slow").html('<font color="#ff5607">Please upload a PDF, DOC, or DOCX file.</font>');
            return false;
        }

        if (file.size > 10 * 1024 * 1024) {
            loading.fadeIn("slow").html('<font color="#ff5607">Your resume must be 10 MB or smaller.</font>');
            return false;
        }

        var formData = new FormData(form);

        loading.fadeIn("slow").html("Submitting...");

        $.ajax({
            type: "POST",
            data: formData,
            url: "php/careerForm.php",
            cache: false,
            contentType: false,
            processData: false,

            success: function(d) {

                if (d == "success") {

                    form.reset();

                    $form.find(".form-control")
                        .removeClass("success")
                        .removeClass("error");

                    loading
                        .fadeIn("slow")
                        .html('<font color="#48af4b">Application submitted successfully.</font>')
                        .delay(4000)
                        .fadeOut("slow");

                } else {

                    loading
                        .fadeIn("slow")
                        .html('<font color="#ff5607">Application could not be sent. Please try again.</font>')
                        .delay(4000)
                        .fadeOut("slow");

                }

            },

            error: function() {

                loading
                    .fadeIn("slow")
                    .html('<font color="#ff5607">There was a problem submitting your application.</font>')
                    .delay(4000)
                    .fadeOut("slow");

            }

        });

        return false;

    });


    $(".career-form .form-control").on("input change", function() {
        $(this).removeClass("error");
    });


});
