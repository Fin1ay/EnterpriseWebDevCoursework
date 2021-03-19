import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import listCardImg from './../assets/images/borderlands.jpg'
import gridCardImg from './../assets/images/600x400.jpg'
import backgroundImg from './../assets/images/background image.jpg'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {list} from './../product/api-product.js'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    marginRight: theme.spacing(1)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    minHeight: 200
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#00000',
    borderBottom: '1px solid #d0d0d0',
    '& a':{
      color: '#3f4771'
    }
  }
}))

export default function Basket( {match} ){

  const classes = useStyles()
  //get product data
  const [products, setProducts] = useState([])
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        console.log("Here is the product data")
        console.log(data)
        setProducts(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }
  }, [match.params.productId])

  //get basket from session storage and format it from string into array
  try{
  var basketString = sessionStorage.getItem('basketData')
}catch(err){
  var basketString = "error1"
}
  console.log(basketString);
  var basketArray = basketString.split(',')
  //clean array entries
  for (var i = 0; i < basketArray.length; i++) {
    basketArray[i] = basketArray[i].replace(/\W/g, '')
  }
  console.log(basketArray);

  var quantity = []
  //remove final character from formatted string and add to array to track
  //quantity being ordered
  for (var i = 0; i < basketArray.length; i++) {
    var lastChar = basketArray[i].length-1
    // console.log(lastChar);
    var finalCharacter = basketArray[i].charAt(lastChar)
    // console.log(finalCharacter);
    quantity.push(finalCharacter)
    basketArray[i] = basketArray[i].slice(0,-1)
  }
  console.log(basketArray);
  //find number of items by parsing quantity
  var numberOfItems = 0
  for (var i = 0; i < quantity.length; i++) {
    numberOfItems += parseInt(quantity[i])
  }

  //total price for basket
  var totalPrice = 0

  return (
    <Paper className={classes.root} elevation={4}>
    <Typography variant="h6" className={classes.title}>
    Basket ({numberOfItems})
    </Typography>
    <List dense>
    {products.map((item, i) => {
      {
        for (var i = 0; i < basketArray.length; i++) {
          var compare = item.name.replace(/\W/g, '')
          //compare the item name to the value passed from basket
          if (basketArray[i].localeCompare(compare) === 0) {
            //for each item in basket,check if they match the name of items in the
            //products database. If they do, add them to list
            return(
              <div>
              <Divider/>
              <ListItemText primary={"Model: "+item.name + "\t Price: £"+ item.price +  "\t Quantity: " + quantity[i]}/>
              Running total: £{Math.round((totalPrice+=(item.price*quantity[i]))*100)/100}
              <Divider/>
              </div>
            )
          }
        }
      }
    }
  )
}

<ListItemText primary={"Total Price: £" + Math.round((totalPrice)*100)/100}/>
<Button onClick = {()=>{


}} >
Confirm </Button>
<Link to = '/'>
<Button onClick = {()=>{
  try{
    sessionStorage.removeItem('basketData')
  }catch(err){}
}} >
Empty Basket and Return to Menu
</Button>
</Link>
</List>
</Paper>
)
}
