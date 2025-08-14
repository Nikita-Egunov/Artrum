export async function GET(req: Request) {
  try {
    return Response.json({
      data: {
        message: 'Hello, World!'
      }
    })
  } catch (error) {
    console.error('Error in GET route:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}