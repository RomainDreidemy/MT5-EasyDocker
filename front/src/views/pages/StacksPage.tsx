import React, {useEffect, useState} from "react";
import StackEntity from "../../services/entities/Stack.entity";
import {IStack} from "../../interfaces/Stack.interface";
import {Link} from "react-router-dom";

const StacksPage = () => {
  const [stacks, setStacks] = useState<IStack[]>([])

  useEffect(() => {
    (async () => {
      const {data: stacksResponse} = await StackEntity.stacks()

      setStacks(stacksResponse)
    })()
  }, []);

  return (
    <section>
      <h1>Stacks</h1>

      {
        stacks.map((stack: IStack) => (
          <div key={stack.id}>
            <h2>{stack.name}</h2>
            <p>{stack.description}</p>
            <Link to={`/stacks/${stack.id}`}>View</Link>
          </div>
        ))
      }
    </section>
  );
}

export default StacksPage;
