<?php

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = trim($_POST["name"]);
    $phone = trim($_POST["phone"]);
    $email = trim($_POST["email"]);
    $subject = trim($_POST["subject"]);
    $message = trim($_POST["message"]);
    $select = trim($_POST["select"]);

    // Set recipient email address
    $to = "voskosvetservices@gmail.com"; 

    // Set email subject
    $email_subject = "New Contact Form Submission";

    // Build email content
    $email_body = "Name: $name\n";
    $email_body .= "Phone: $phone\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Subject: $subject\n";
    $email_body .= "Message: $message\n";
    $email_body .= "Selected Service: $select\n";

    // Set email headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        // Email sent successfully
        echo json_encode(array("status" => "success", "message" => "Your message has been sent successfully!"));
    } else {
        // Failed to send email
        echo json_encode(array("status" => "error", "message" => "Failed to send message. Please try again later."));
    }
} else {
    // If not submitted through POST method, return error
    echo json_encode(array("status" => "error", "message" => "Invalid request method."));
}
?>
