import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Person from '@material-ui/icons/Person'
import {list} from './api-Product.js'
// import {list} from './api-Product.js'
import galaxyA12 from './../assets/images/GalaxyA12.jpg'
import iPhone11 from './../assets/images/iPhone12.jpg'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 2000,
    minWidth: 250,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    minHeight: 500,
    maxHeight: 500,
    minWidth: 200,
    maxWidth: 300
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#00000',
    borderBottom: '1px solid #d0d0d0',
    '& a':{
      color: '#3f4771'
    }
  },
  button:{
    backgroundColor: '000000'
  }
}))

//function to replace part of string
String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement;
}

//grid view of products
export default function ProductGrid({match}){
  const [products, setProducts] = useState([])
  const classes = useStyles()
  var itemsArray = []
  var img = './../assets/images/GalaxyA12.jpg'
  var str = ""
  const varToString = varObj => Object.keys(varObj)[0]

  //get products
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


  //for each product:
  return (
    <Grid container spacing = {0}>
    {products.map((item, i) => {
      //originally had item.image as a string containing the file location. I 
      //believe did not work because
      //the file location is changed to dist folder with random name once imported
      //and converted in server.generated
      // img = item.image
      //unable to get images from imports since eval is deemed unsafe by browser
      // str = item.image
      // img = getVar(str)

      //structure of cards being returned to user, displaying item information
      return <Grid item md={4}>
      {console.log(str)}
      <Card className={classes.card}>
      <Typography variant="h6" className={classes.title}>
      {item.name}
      </Typography>
      <CardMedia/>
      <CardContent>
      <Divider/>
      <Typography variant="body1" component="p">
      {item.description}
      </Typography>
      <Divider/>
      <Typography variant="body1" component="p">
      Price: £{item.price}
      </Typography>
      <Divider/>

      <Button onClick = {()=>{
        //when user clicks on product, is added to array of items acting as basket.
        var isThere = false;
        //checks if item is in array
        //if item is found, add 1 to quantity at end of number
        for (var i=0; i<itemsArray.length; i++){
          if (itemsArray[i].includes(item.name)) {
            isThere = true
            var pos = item.name.length
            var newNumber = parseInt(itemsArray[i].charAt(pos))+1
            console.log(newNumber)
            console.log(pos)
            var a = itemsArray[i].replaceAt(pos, newNumber)
            itemsArray.splice(i,1,a)
            console.log(a);

          }
        }
        //if item is not found, add instance as well as "1" to signify quantity
        if (isThere === false) {
          itemsArray.push(item.name+"1")
          console.log(itemsArray);
        }
      }}>Add Item to Basket
      </Button>
      </CardContent>
      </Card>
      </Grid>
    })
  }
  <Card style={{height:'3rem'}}>

  <Link to="/basket">
  <Button className={classes.button} onClick = {()=>{
    //sets variables that are available across all pages in session
    try{
    sessionStorage.setItem('basketData', JSON.stringify(itemsArray))
    sessionStorage.setItem('fromGrid', true)
    sessionStorage.setItem('fromList', false)
  }catch(err){

  }
  }} > Go To Basket </Button>
  </Link>
  </Card>
  </Grid>
)
}
