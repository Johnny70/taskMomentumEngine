
<script lang="ts">
// Enkel startsida med Google-login
</script>

<style>
.login-container {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: #f5f7fa;
}
.login-box {
	background: #fff;
	padding: 2rem 3rem;
	border-radius: 12px;
	box-shadow: 0 2px 16px rgba(33,150,243,0.08);
	display: flex;
	flex-direction: column;
	align-items: center;
}
.login-box h1 {
	margin-bottom: 1.5rem;
}
.login-btn {
	background: #4285f4;
	color: #fff;
	border: none;
	border-radius: 4px;
	padding: 0.7rem 2rem;
	font-size: 1.1rem;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 0.7rem;
	margin-top: 1rem;
}
.login-btn:hover {
	background: #1769aa;
}
</style>

<div class="login-container">
	<div class="login-box">
		<h1>TaskMomentum</h1>
		<button class="login-btn" on:click={() => window.location.href = '/api/auth'}>
			<svg width="24" height="24" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C36.13 2.7 30.45 0 24 0 14.82 0 6.73 5.8 2.69 14.09l7.98 6.2C12.36 13.13 17.74 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.29a14.5 14.5 0 0 1 0-8.58l-7.98-6.2A23.94 23.94 0 0 0 0 24c0 3.77.9 7.34 2.69 10.49l7.98 6.2z"/><path fill="#EA4335" d="M24 48c6.45 0 12.13-2.13 16.19-5.8l-7.19-5.6c-2.01 1.35-4.59 2.15-9 2.15-6.26 0-11.64-3.63-13.33-8.79l-7.98 6.2C6.73 42.2 14.82 48 24 48z"/></g></svg>
			Logga in med Google
		</button>
	</div>
</div>
