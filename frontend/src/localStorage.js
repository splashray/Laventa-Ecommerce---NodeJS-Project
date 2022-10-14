export const getcartItems = () =>{
    const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []
    return cartItems
}

export const setCartItems =(cartItems) =>{
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

export const setUserInfo = ({
    _id ='',
    name= '',
    email = '',
    password = '',
    firstName = '',
    lastName = '',
    phone = '',
    deliveryAddress = '', 
    additional = '',
    town = '',
    state = '',
    company = '', 
    country = '',

    token = '',
    isAdmin = false,
}) =>{
    localStorage.setItem(
        'userInfo',
        JSON.stringify({
            _id,
            name,
            email,
            password,
            firstName,
            lastName,
            phone,
            deliveryAddress, 
            additional,
            town,
            state,
            company, 
            country,

            token,
            isAdmin,
        })
    )
}

export const clearUser = ()=>{
    localStorage.removeItem('userInfo')
}

export const getUserInfo = ()=>{
    return localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : {name: '', email: '', password: ''};
}

export const getPayment = () => {
    const payment = localStorage.getItem('payment')
    ? JSON.parse(localStorage.getItem('payment'))
    : {paymentMethod: 'paypal'};
    return payment;
}

export const setPayment = ({paymentMethod= 'paypal'}) => {
    localStorage.setItem('payment', JSON.stringify({paymentMethod}))
}

export const cleanCart = () =>{
    localStorage.removeItem('cartItems')
}