<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Will You Be My Valentine?</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            text-align: center;
            background-color: #ffebf0;
            margin: 0;
            padding: 0;
        }
        .container {
            margin-top: 15%;
        }
        h1 {
            color: #d6336c;
            font-size: 2.5em;
        }
        p {
            color: #444;
            font-size: 1.2em;
            margin-bottom: 30px;
        }
        .buttons {
            display: flex;
            justify-content: center;
            gap: 20px;
        }
        button {
            font-size: 1.2em;
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
        }
        .yes {
            background-color: #ff4d6d;
            color: white;
            font-weight: bold;
        }
        .yes:hover {
            background-color: #e63950;
            transform: scale(1.1);
        }
        .no {
            background-color: #ddd;
            color: #555;
        }
        .no:hover {
            position: relative;
            animation: shake 0.5s ease-in-out infinite;
        }
        @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Yianna, Will You Be My Valentine? ❤️</h1>
        <p>I love you and I want to make this day extra special for you!</p>
        <div class="buttons">
            <button class="yes" onclick="showMessage()">Yes! 💖</button>
            <button class="no">No 🙃</button>
        </div>
        <p id="response" style="display: none; font-size: 1.5em; margin-top: 20px; color: #d6336c;"></p>
    </div>

    <script>
        function showMessage() {
            document.getElementById("response").innerText = "Yay! I can't wait to make this Valentine's Day amazing for you! ❤️";
            document.getElementById("response").style.display = "block";
        }
    </script>
</body>
</html>
