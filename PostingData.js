const names = ["Partha Sarathi Das", 
"Pradeep Kumar Kayshap", 
"Pradeep Kumar Mishra", 
"Pradeep Pranjal", 
"Pradeep Tripathi", 
"Pranshu Pranjal", 
"Prasad Begde",
"Prashant G K", 
"Prashant Kumar Pandey", 
"Prashant Kumar Pal", 
"Prashant Sharma", 
"Prashant Tripathi", 
"Pratosh Kumar Pal", 
"Praveen Lalwani", 
"Praveen Kumar Lalwani", 
"Praveen Lalwani", 
"Pravin Kumar", 
"Preetam Suman", 
"Prerit Agrawal", 
"Pushpdant Jain", 
"Pushpinder Singh Patheja", 
"R. Shriram", 
"R. Sukumar", 
"R. Vayunandanakishore", 
"Rahul Kumar Chaturvedi", 
"Rajdeep Ghosh", 
"Rajdeep Singh Payal", 
"Rajendra Mahanandia", 
"Rajit Nair", 
"Rajkumar S", 
"Rajneesh Kumar Patel", 
"Ram Kumar", "Ram Raj", 
"Ramraj Dangi", 
"Ranjitha Kumar", 
"Ravi Verma", 
"Reena Jain", 
"Reena Yadav", 
"Rekha Mahanandia", 
"Rekha Thakur", 
"Rekha Yadav", 
"Rohit Sharma", 
"Rupali Singh", 
"Rudra Kalyan Nayak", 
"S. Ananthakumaran", 
"S. Aanjan Kumar", 
"S. Devaraju", 
"S. Periyanayagi", 
"S. Poonkuntran", 
"S. Saravanan", 
"S. Vairachilai", 
"S. Yogesh", 
"Sadanand Singh", 
"Sagar Tiwari", 
"Sagarika Samantaray", 
"Sai Manjari", 
"Sakshi Agarwal", 
"Saliha Parveen", 
"Sameer Kumar Singh", 
"Sangeeta Yadav", 
"Sangram Keshari Das",
 "Sanjay Kumar Patel", 
 "Sanjay Kumar Yadav", 
 "Sanjay Naha", 
 "Sanjib Nayak", 
 "Santosh Kumar Bhal", 
 "Santosh Kumar Sahoo", 
 "Santosh Kumar Tripathi", 
 "Saravanan J", 
 "Saravanan S", 
 "Sasmita Padhy", 
 "Sasmita Singh", 
 "Satish Kumar", 
 "Satyam Ravi", 
 "Satyendra Singh", 
 "Saurabh Bhargava", 
 "Saurabh Kumar Maurya", 
 "Saurabh Mishra", 
 "Sayed Mohammed Zeeshan", 
 "Sayed Muhammad Zeeshan", 
 "Shahab Saquib Sohail", 
 "Shahin Kayenat", 
 "Sharad Chandra Tripathi", 
 "Sheerin Kayenat", 
 "Sheetal Sharma", 
 "Shifa Ali", 
 "Shilpa Singh", 
 "Shilpa Suman", 
 "Shiv Manjaree Gopaliya",
  "Shweta Mukherjee", 
  "Shreya Sharma", 
  "Shrikant Tiwari", 
  "Shubham Gupta", 
  "Shubham Singh", 
  "Shuchi Singh", 
  "Siddharth Singh Chouhan",
   "Siddharth Maiti",
    "Siddharth Singh", 
    "Simran Sharma", 
    "Sivabalan KR", 
    "Sivasankaran", 
    "Soumya Sankar Ghosh", 
    "Soumitra Nayak", 
    "Suchetana Sadhukhan", 
    "Suchismita Patra", 
    "Sudhakar Prasad", 
    "Sudhir Kumar Patel", 
    "Sughvanewshar Ramu Pasupathi", 
    "Sukriti Gupta", 
    "Sumit Mittal", 
    "Sumit Som",
     "Sunil Kumar", 
     "Sunita Sharma", 
     "Suraj Kumar", 
     "Suresh Babu", 
     "Suresh Dara", 
     "Suresh Kumar", 
     "Suresh Prasad",
      "Sushant Kumar Panigrahi", 
      "Swagat Samantaray", 
      "Swati Chauhan",
       "Swati Shukla", 
       "Sweta Kumari", 
       "Tarun Kumar", 
       "Thamim M", 
       "Trapti Sharma", 
       "Uday Kumar", 
       "Udai Kumar", 
       "V. Venkat Padhy", 
       "Vaibhav Kashinath Khatavkar", 
       "Venkat Padhy", "Vicky Singh", 
       "Vijay Kumar Patel", 
       "Vijay Kumar Patidar", 
       "Vijendra Singh Bramhe", 
       "Vikas Panthi", 
       "Vinay Kumar", 
       "Vinay Kumar Jatav", 
       "Vinay Kumar Mishra", 
       "Vinod Bhatt", 
       "Vinod Kumar", 
       "Vinesh Kumar", 
       "Vivek Parashar", 
       "Vivek Sharma", 
       "Vivek Singh", 
       "Yogesh Shukla", 
       "Zaheer Kareem Ansari"]
for (const name of names){
    let data = {
        "name":name
    }

    fetch("http://localhost:3500/professor", {
    method: "POST", // Specify the HTTP method
    headers: { "Content-Type": "application/json" }, // Set headers (optional)
    body: JSON.stringify(data) // Convert data to JSON string
    })
    .then(response => response.json()) // Parse response as JSON (optional)
    .then(data => console.log("Success:", data)) // Handle successful response
    .catch(error => console.error("Error:", error)); // Handle errors
}