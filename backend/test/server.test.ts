import { server } from "../src/server"
import Prisma from "../src/db";
import { Entry } from "@prisma/client";

beforeAll(async () => {
  return Prisma.entry.deleteMany({})
})

beforeEach(async () => {
  const uuid: string = crypto.randomUUID()
  const payload : Entry = {
    id : uuid,
    title : "Hello World",
    description: "This is test message 1",
    created_at: new Date(),
    scheduled : new Date()
  }
  return Prisma.entry.create({data : payload})

})

afterEach(async () => {
  return Prisma.entry.deleteMany({})
})

describe("test adding an item", () => {
  it("should add an item to the database", async () => {

    const uuid: string = crypto.randomUUID()
    const payload : Entry = {
      id : uuid,
      title : "Hello Again",
      description: "This is a test message 2",
      created_at: new Date(),
      scheduled : new Date()
    }
    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload : payload
    });

    const body = await response.json();

    const count = await Prisma.entry.count();

    expect(count).toEqual(2);
  })
})

describe("test getting entries after adding an item", () => {
  it("should return list of items", async () => {
    const uuid: string = crypto.randomUUID()
    const payload : Entry = {
      id : uuid,
      title : "Hello Again",
      description: "This is a test message 2",
      created_at: new Date(),
      scheduled : new Date()
    }
    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload : payload
    });


    const response2 = await server.inject({
      method: "GET",
      url: "/get/"
    });

    const body = await response2.json();

    expect(body.length).toEqual(2)
  });
}
);

describe("test getting an item by id", () => {
  it("should return the correct item", async () => {
    const uuid: string = crypto.randomUUID()
    const payload : Entry = {
      id : uuid,
      title : "Item to select",
      description: "This is a message to be selected",
      created_at: new Date(),
      scheduled : new Date()
    }

    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload : payload
    });

    const getItem = await server.inject({
      method : "GET",
      url: "/get/"+uuid
    })

    const item = await getItem.json()

    expect(item.id).toEqual(uuid)
    expect(item.title).toEqual(payload.title)
    expect(item.description).toEqual(payload.description)
  });
})

describe("test deleting an item by id", () => {
  it("should remove the correct item", async () => {
    const uuid: string = crypto.randomUUID()
    const payload : Entry = {
      id : uuid,
      title : "Item to select",
      description: "This is a message to be selected",
      created_at: new Date(),
      scheduled : new Date()
    }

    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload : payload
    });

    const getItem = await server.inject({
      method : "DELETE",
      url: "/delete/"+uuid
    })

    const item = await getItem.json()

    const exists = await Prisma.entry.findFirst(
      {
        where : {
          id : uuid
        }
      }
    )
    expect(exists).toBe(null)
  });
});


describe("test updating an item",()=>{

  it("should update the contents of the item", async () => {

    const response = await server.inject({
      method: "GET",
      url: "/get/"
    });

    const item = (await response.json())[0] as Entry
    const id : string = item.id

    const updatedValues = {
      title: "Updated Title",
      description: "Updated Description"
    }



    const request = await server.inject({
      method: "PUT",
      url: "/update/"+id,
      payload: updatedValues
    });

    const request2 = await server.inject({
      method: "GET",
      url: "/get/"+item.id
    });

    const updatedItem = await request2.json() as Entry

    expect(updatedItem.id).toBe(item.id)
    expect(updatedItem.title).toBe(updatedValues.title)
    expect(updatedItem.description).toBe(updatedValues.description)
  }
  )
})

describe("test exception case for get", () => {
  it("should trigger a 500 status code error", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/get/not-found"
    })
    const message = await response.json()

    expect(response.statusCode).toBe(500)
  }
  )
})

describe("test exception case for create", () => {
  it("should trigger a 404 status code error", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/get/not-found",
      payload : {tmp : "invalid-date-item"}
    })
    const message = await response.json()

    expect(response.statusCode).toBe(404)
  }
  )
})

describe("test exception case for delete", () => {
  it("should trigger a 500 status code error", async () => {
    const response = await server.inject({
      method: "DELETE",
      url: "/delete/not-found"
    })
    const message = await response.json()

    expect(response.statusCode).toBe(500)
  }
  )
})

describe("test exception case for update", () => {
  it("should trigger an error", async () => {

    const response = await server.inject({
      method: "GET",
      url: "/get/"
    });

    const item = (await response.json())[0] as Entry
    const id : string = item.id

    const response2 = await server.inject({
      method: "PUT",
      url: "/update/" + id,
      payload: {
        scheduled : "not-valid"
      }
    })
    const message = await response2.json()

    

    expect(message.statusCode).toBe(undefined)
  }
  )
})

