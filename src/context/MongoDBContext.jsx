import React, { createContext, useContext, useState, useEffect } from 'react';

const MongoDBContext = createContext();

export const useMongoDB = () => {
  const context = useContext(MongoDBContext);
  if (!context) {
    throw new Error('useMongoDB must be used within a MongoDBProvider');
  }
  return context;
};

export const MongoDBProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const MONGODB_CONFIG = {
    DATABASE: "PrachiSocial",
    COLLECTIONS: {
      USERS: "users",
      POSTS: "posts",
      NOTIFICATIONS: "notifications",
      LIKES: "likes",
      COMMENTS: "comments"
    }
  };

  const callMongoAPI = async (action, collection, data = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/mongodb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          collection,
          ...data
        })
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'API call failed');
      }

      return result.data;
    } catch (error) {
      console.error('MongoDB API Error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const insertOne = async (collection, document) => {
    return await callMongoAPI('insertOne', collection, { data: document });
  };

  const find = async (collection, query = {}) => {
    return await callMongoAPI('find', collection, { query });
  };

  const findOne = async (collection, query = {}) => {
    return await callMongoAPI('findOne', collection, { query });
  };

  const updateOne = async (collection, filter, update) => {
    return await callMongoAPI('updateOne', collection, { 
      query: filter, 
      update 
    });
  };

  const deleteOne = async (collection, filter) => {
    return await callMongoAPI('deleteOne', collection, { query: filter });
  };

  const aggregate = async (collection, pipeline = []) => {
    return await callMongoAPI('aggregate', collection, { data: pipeline });
  };

  useEffect(() => {
    const testConnection = async () => {
      try {
        setLoading(true);
        
        await find('users');
        setIsConnected(true);
      } catch (error) {
        console.log('MongoDB connection test failed, using localStorage fallback');
        setIsConnected(false);
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  const reconnect = async () => {
    await testConnection();
  };

  const value = {
    
    isConnected,
    loading,
    error,

    config: MONGODB_CONFIG,

    insertOne,
    find,
    findOne,
    updateOne,
    deleteOne,
    aggregate,

    reconnect
  };

  return (
    <MongoDBContext.Provider value={value}>
      {children}
    </MongoDBContext.Provider>
  );
};