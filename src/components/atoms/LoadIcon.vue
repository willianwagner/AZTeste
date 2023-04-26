<template>
    <div class="spinner"></div>
  </template>
  
  <style>
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #7988a3;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    animation: spin 1s linear infinite;
    margin: 20px auto;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>