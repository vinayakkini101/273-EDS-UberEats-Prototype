
const addNewDish = `
    mutation addNewDish($dishCode: String, $dishName: String, $category: String, $description: String, $ingredients: String, $imageLink: String, $price: String, $email: String) {
        addNewDish(dishCode: $dishCode, dishName: $dishName, description: $description, ingredients: $ingredients, imageLink: $imageLink, category: $category, price: $price, email: $email) {
            dishCode
            dishName
            category
            price
            description
            imageLink
            ingredients
            email
        }
    }
`;

const signupCustomer = `
    mutation signupCustomer($email: String, $name: String, $password: String, $contactNumber: String, 
                                $dob: String, $nickname: String, $about: String, $profilePicture: String) {
        signupCustomer(email: $email, name: $name, password: $password, contactNumber: $contactNumber, dob: $dob, nickname: $nickname, about: $about, profilePicture: $profilePicture) {
            email
            name
            password
            contactNumber
            dob
            nickname
            about
            profilePicture
        }
    }
`;

const signupRestaurant = `
    mutation signupRestaurant($email: String, $name: String, $password: String, $contactNumber: String, 
            $startTime: String, $endTime: String, $description: String, $profilePicture: String, $isRestaurant: String) {
        signupRestaurant(email: $email, name: $name, password: $password, contactNumber: $contactNumber, startTime: $startTime, endTime: $endTime, description: $description, profilePicture: $profilePicture, isRestaurant: $isRestaurant) {
            email
            name
            password
            contactNumber
            startTime
            endTime
            description
            profilePicture
            isRestaurant
        }
    }
`;

export { addNewDish, signupCustomer, signupRestaurant };