<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Email settings
    $to = "2217758@talnet.nl";
    $subject = "New Contact Form Submission";
    $body = "You have received a new message from $name ($email):\n\n$message";
    $headers = "From: $email";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        // Redirect or display a success message
        echo "Bedankt voor sturen van de mail! Ik zal zo snel mogelijk reageren!";
    } else {
        echo "Sorry, er is iets fout gegaan... Probeer het later opnieuw!";
    }
}
?>
