import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import backgroundImg from './../assets/images/background image.jpg'


const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    minHeight: 300,
    maxHeight:300,
    minWidth:250,
    maxWidth:250
  },
  picture: {
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

//home page which allows users to select type of layout they want to view
export default function Home(){
  const classes = useStyles()
  return (

    <div className = {classes.root}>
    <div className = {classes.wrapper}>
    <Grid>
    <Card className={classes.card}>
    <CardMedia className={classes.picture} image={backgroundImg} title="My Image"/>
    </Card>
    </Grid>
    </div>

    <Grid container direction="row" alignContent='center' justify="center">
    <Grid item md={4}>
    <Link to="/productlist">
    <Card className={classes.card}>
    <Typography variant="h6" className={classes.title}>
    List
    </Typography>
    <CardContent>
    <Typography variant="body1" component="p">
    Select products while viewing the page as a list of items.
    </Typography>
    </CardContent>
    </Card>
    </Link>
    </Grid>

    <Grid item md={4}>
    <Link to="/productgrid">
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
    </Link>
    </Grid>
    </Grid>
    </div>
  )
}
