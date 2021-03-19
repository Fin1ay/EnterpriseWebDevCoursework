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
    minWidth: 200
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

function getVar(varString){
  var newValue = eval(varString)
  return newValue
}
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement;
}

export default function ProductGrid({match}){
  var itemsArray = []
  const [products, setProducts] = useState([])
  const classes = useStyles()
  var img = './../assets/images/GalaxyA12.jpg'
  var str = ""
  const varToString = varObj => Object.keys(varObj)[0]


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

  return (
    <Grid container spacing = {0}>
    {products.map((item, i) => {
      //originally had item.image storing the file location. Did not work because
      //the file location is changed to dist folder with random name once imported,
      // img = item.image
      //unable to get images from imports since eval is deemed unsafe by browser
      // str = item.image
      // img = getVar(str)

      return <Grid item md={4}>
      {console.log(str)}
      <Card className={classes.card}>
      <Typography variant="h6" className={classes.title}>
      {item.name}
      </Typography>
      // <CardMedia className={classes.media} image={img} title="My Image"/>
      <CardContent>
      <Typography variant="body1" component="p">
      {item.price}
      </Typography>
      //when user clicks on product, is added to array of items acting as basket.
      <Button onClick = {()=>{
        var isThere = false;
        //checks if item is in array
        for (var i=0; i<itemsArray.length; i++){
          //if item is found, add 1 to quantity at end of number
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
      }}>Add Item
      </Button>
      </CardContent>
      </Card>
      </Grid>
    })
  }
  <Link to="/basket">
  <Button onClick = {()=>{
    //sets variables that are available across all pages in session
    sessionStorage.setItem('basketData', JSON.stringify(itemsArray))
    sessionStorage.setItem('fromGrid', true)
    sessionStorage.setItem('fromList', false)
  }} >
  Basket </Button>
  </Link>
    </Grid>
  )
}
