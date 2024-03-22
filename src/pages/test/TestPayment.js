import React, { useRef, useEffect, useState } from 'react';
import './TestPayment.css';
import axios from 'axios';


function TestPayment() {
    const [tok,setToken] = useState(null)
    useEffect(()=>{
        axios.post("https://accept.paymob.com/api/auth/tokens",{api_key:"ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RRNU1EWTRMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuVzJWYThpazlQTmFLZ2JnYTRwNUVIUl9TRkE3bTRuTml5MWVOTU9WUTVrQ01LRUo5Ujl0dmJab1hRb3gtMWhnSE1NRDlranVjWGxOeTFVQ1ZOQm9yVGc="})
        .then((res)=>{
            console.log(res.data)
            const token = res.data.token
            const data = {
                "auth_token": token,
                "delivery_needed": "false",
                "amount_cents": "500",
                "currency": "EGP",
                "items": [
                  {
                      "name": "Item 1",
                      "amount_cents": "500",
                      "description": "Smart Watch",
                      "quantity": "1"
                  }
                  ]
              }
            axios.post(" https://accept.paymob.com/api/ecommerce/orders",data).then((res1)=>{
                const ID = res1.data.id
                console.log("Res1: \n",ID)
                const data1 = 
                {
                    "auth_token": token,
                    "amount_cents": "500", 
                    "expiration": 3600, 
                    "order_id": ID,
                    "billing_data": {
                      "apartment": "803", 
                      "email": "omarahmedelnemr10@gmail.com", 
                      "floor": "42", 
                      "first_name": "Clifford", 
                      "street": "Ethan Land", 
                      "building": "8028", 
                      "phone_number": "+86(8)9135210487", 
                      "shipping_method": "PKG", 
                      "postal_code": "01898", 
                      "city": "Jaskolskiburgh", 
                      "country": "CR", 
                      "last_name": "Nicolas", 
                      "state": "Utah"
                    }, 
                    "currency": "EGP", 
                    "integration_id": 4424446
                  }
                axios.post(" https://accept.paymob.com/api/acceptance/payment_keys",data1).then((res2)=>{
                    console.log(res2.data)
                    setToken(res2.data.token)
                })
            })
        })
    },[])

    useEffect(()=>{
        if(tok){
            console.log("Token is Obtained")

        }else{
            console.log("Token is Not Yet Obtained")
        }
    },[tok])
    return (
        <div id="TestPayment">
            {tok?
            <a href={`https://accept.paymob.com/api/acceptance/iframes/811563?payment_token=${tok}`} target='__blank'>Link is Ready</a>            
            :''}
        </div>
    );
}

export default TestPayment;


