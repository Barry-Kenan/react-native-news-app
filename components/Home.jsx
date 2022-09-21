import React from 'react';
import axios from 'axios';
import {  Alert, FlatList, Text, View, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import {Post}  from './../components/Post';
import { Loading } from './Loading';


export default function Home({ navigation }) {
  const [items, setItems] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get('https://632974b2d2c97d8c5267b07d.mockapi.io/articles')
      .then(({data}) => {
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'При получении статьи произошла ошибка')
      }).finally(() => {
        setIsLoading(false);
      });
  }

  React.useEffect(fetchPosts, [])

  if(isLoading) {
    return <Loading />
  }

  return (
    <View >
      
      <FlatList 
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
        data = {items}
        renderItem = {( {item} ) => (
          <TouchableOpacity onPress={() => navigation.navigate('FullPost', { id: item.id, title: item.title})}>
            <Post title = {item.title} imageUrl = {item.imageUrl} createdAt ={item.createdAt} />
          </TouchableOpacity>
        )}
      /> 
    </View>
  );
}


