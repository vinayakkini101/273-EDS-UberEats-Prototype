// import { gql } from 'apollo-boost';

const getAllDishesQuery = `
    query getAllDishesQuery($email: String) {
        restaurant(email: $email) {
            email
            dishes {
                dishCode
                dishName
                description
                ingredients
                category
                price
                imageLink
            }
        }
    }
`;

const getRestaurantQuery = `
    query getRestaurantQuery($email: String) {
        restaurant(email: $email) {
            email
            name
            password
            contactNumber
            startTime
            endTime
            description
            profilePicture
            pickup
            delivery
            veg
            nonVeg
            vegan
            address {
                street
                city
                state
                country
            }
            dishes {
                dishCode
                dishName
                description
                ingredients
                category
                price
                imageLink
            }
        }
    }
`;

const getOrderQuery = `
    query getOrderQuery($userEmail: String, $restaurantName: String) {
        orders(userEmail: $userEmail, restaurantName: $restaurantName) {
            userEmail
            dateTime
            address
            status
            userName
            restaurantName
            orderedDishes {
                dishName
                price
                quantity
                dishImage
            }
        }
    }
`;


export { getAllDishesQuery, getRestaurantQuery, getOrderQuery };