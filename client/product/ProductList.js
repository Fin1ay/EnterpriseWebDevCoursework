import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward'
import Person from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
import {Link} from 'react-router-dom'
import {list} from './api-Product.js'
import auth from './../auth/auth-helper'


const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  }
}))

export default function Products({ match }) {
  var itemsArray = []
  window.onbeforeunload=sessionStorage.setItem('basketData', JSON.stringify(itemsArray))
  const classes = useStyles()
  const [products, setProducts] = useState([])
  const jwt = auth.isAuthenticated()

  const [basket, setBasket] = useState([])

  //replace part of string at chosen index
  String.prototype.replaceAt = function(index, replacement) {
      return this.substr(0, index) + replacement;
  }

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
    <Paper className={classes.root} elevation={4}>
    <Typography variant="h6" className={classes.title}>
    All Products ({products.length})
    </Typography>
    <List dense>
    {products.map((item, i) => {
      return (
        <ListItem button onClick = {()=>{
          var isThere = false;
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
          if (isThere === false) {
            itemsArray.push(item.name+"1")
            console.log(itemsArray);
          }
        }}>
        <ListItemText primary={item.name}/>
        <ListItem>
        <Divider />
        <ListItemText primary={"Description: " + item.description}/>
        </ListItem>
        <ListItemText primary={"Price: £" + item.price}/>
        </ListItem>)
      })
    }
    </List>
    </Paper>
  )
}
