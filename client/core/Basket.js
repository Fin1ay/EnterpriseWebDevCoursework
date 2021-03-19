import React from 'react'
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

export default function Home(){
  const classes = useStyles()

  //get basket from session storage and format it
  var basketString = sessionStorage.getItem('basketData')
  console.log(basketString);
  var basketArray = basketString.split(',')
  //clean array entries
  for (var i = 0; i < basketArray.length; i++) {
    basketArray[i] = basketArray[i].replace(/\W/g, '')
  }
  console.log(basketArray);


  return (
    <Grid>
    <Grid item md={4}>
    <Card className={classes.card}>
    <Typography variant="h6" className={classes.title}>
    Grid
    </Typography>
    <CardContent>
    <Typography variant="body1" component="p">
    Select products while viewing the page as a grid of items.
    </Typography>
    </CardContent>
    </Card>
    </Grid>
    </Grid>
  )
}
