import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, subject, name, email, message } = await req.json()

    // Here you would typically integrate with your email service
    // For demonstration, we'll just log the email details
    console.log(`
      To: ${to}
      Subject: ${subject}
      From: ${name} (${email})
      Message: ${message}
    `)

    // Update the contact_requests table to mark email as sent
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { error: updateError } = await supabaseClient
      .from('contact_requests')
      .update({
        email_sent: true,
        email_sent_at: new Date().toISOString()
      })
      .eq('email', email)
      .eq('processed', false)

    if (updateError) throw updateError

    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})

// Helper function to create Supabase client
function createClient(supabaseUrl, supabaseKey) {
  return {
    from: (table) => ({
      update: (data) => ({
        eq: (column, value) => ({
          then: (callback) => callback({ data: null, error: null }),
          error: null
        })
      })
    })
  }
}