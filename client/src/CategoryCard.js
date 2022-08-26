import { Link } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import { useEffect, useState } from 'react';

function CategoryCard(Name, IconBackImg, NavBackImg, Position) {
  return (
    <div class="col-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{name}</h5>
          <p class="card-text">${address}</p>
          <a href="housing.html?id=${data.records[i].id}" class="btn btn-primary">
            More Information
          </a>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
