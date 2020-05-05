import React from 'react';

type IfTypes = {
  condition: boolean | number;
  children?: React.ReactNode;
  render?: Function;
};

export const If: React.FC<IfTypes> = ({ condition, render, children }) =>
  condition ? (render ? render() : children) : null;