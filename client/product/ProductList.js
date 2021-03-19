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
          if(itemsArray.has(item.name)){
            itemsArray.set(item.name, (itemsArray.get(item.name) + 1))
            console.log(itemsArray);
          }else{
            itemsArray.set(item.name, 1)
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
