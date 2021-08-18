import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getRoutes, RouteContext } from '../store';
import NewRoute from './NewRoute';
import { RouteItem } from './RouteItem';

export default function Homepage() {
  const { store, dispatch } = useContext(RouteContext);
  const { routes } = store;
  // Local state to keep track of the draggable list
  const [draggableList, setDraggableList] = useState(routes);
  // If I have existing routes, load them here using useEffect
  useEffect(async () => {
    try {
      const response = await getRoutes(dispatch);
      console.log('setting draggable list');
      setDraggableList(response);
      console.log('before response');
      console.log(response);
      console.log('after response');
    } catch (error) {
      console.log(error);
    }
  }, []);

  // This handles storing the changed positions of the items
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(draggableList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDraggableList(items);
  };

  if (!draggableList) {
    console.log('foo');
    return 'foo';
  }

  return (
    <div>
      <h1>Krabi</h1>
      <h3>Routes</h3>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="routes-list">
          {(provided) => (
            <ul
              className="routes-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >

              {draggableList.map((route, index) => (
                <Draggable
                  key={route.id}
                  draggableId={`${route.id}`}
                  index={index}
                >
                  {(provided) => (
                    // li is necessary here
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <RouteItem
                        key={route.id}
                        index={index}
                        id={route.id}
                        name={route.name}
                        difficulty={route.difficulty}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <NewRoute />
    </div>
  );
}
