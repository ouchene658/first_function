const http = require("http");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("path/to/serviceAccountKey.json"); // Replace with your service account key file path
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<your-firebase-project-id>.firebaseio.com" // Replace with your Firestore database URL
});

const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type" : "text/plain"});
    res.end("Hello world!");

    // Add data to Firestore when a request is received
    const dataToAdd = {
        key: "value",
        anotherKey: "anotherValue"
    };

    addDataToFirestore(dataToAdd);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log("Server is running on port 3000"));

// Function to add data to Firestore
async function addDataToFirestore(data) {
    const db = admin.firestore();
    try {
        const docRef = await db.collection("your-collection-name").add(data);
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}
