'use client';
import { useParams } from 'next/navigation';
import React from 'react'

const ViewComponent = () => {

  const { id } = useParams();

  return (
    <div>ViewComponent</div>
  )
}

export default ViewComponent;