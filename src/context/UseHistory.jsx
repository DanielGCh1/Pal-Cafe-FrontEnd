
import React, { createContext, useState } from 'react';
import axios from 'axios'

export const UseHistory = createContext();

export const HistoryProvider = (props) => {

  const setData = async (date, list) => {
    try {
        const post = {
            date: date,
            list: list
        }
        console.log(JSON.stringify(post))
        const res = await axios.post("", post)
    } catch (error) {
        console.log(error)
    }
  }

  const getData = (data) => {
   
  }

  return (
    <UseHistory.Provider value={{ 
      
    }}>
      {props.children}
    </UseHistory.Provider>
  )
}