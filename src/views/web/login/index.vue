<!-- 登录页面 -->
<script setup lang="ts"></script>

<template>
	<div>
		<main>
			<section class="relative w-full h-full min-h-screen login-img">
				<div class="absolute top-0 w-full h-full bg-no-repeat bg-cover">
					<div class="container mx-auto px-4 h-full">
						<div class="flex content-center items-center justify-center h-full">
							<div class="w-full lg:w-4/12 px-4">
								<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
									<div class="rounded-t mb-0 px-6 py-6">
										<div class="text-center mb-3">
											<h6 class="font-bold text-2xl">bilibili 登录</h6>
										</div>
									</div>
									<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
										<div class="text-gray-400 text-center mb-3 font-bold"></div>
										<form>
											<div class="relative w-full mb-3">
												<!-- <label class="block uppercase text-sm font-bold mb-2" htmlFor="grid-password"> 手机/邮箱 </label> -->
												<input
													type="text"
													class="border-0 px-3 py-3 placeholder-gray-400 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
													placeholder="请输入账号或邮箱"
												/>
											</div>

											<div class="relative w-full mb-3">
												<!-- <label class="block uppercase text-sm font-bold mb-2" htmlFor="grid-password"> 密码 </label> -->
												<input
													type="password"
													class="border-0 px-3 py-3 placeholder-gray-400 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
													placeholder="请输入密码"
												/>
											</div>
											<!-- TODO: 添加验证码 -->
											<!-- <div class="relative w-full mb-3">
												<input
													type="text"
													class="border-0 px-3 py-3 placeholder-gray-400 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-3/4 ease-linear transition-all duration-150"
													placeholder="请输入验证码"
												/>
											</div> -->

											<div>
												<label class="inline-flex items-center cursor-pointer">
													<input
														id="customCheckLogin"
														type="checkbox"
														class="form-checkbox border-0 rounded text-gray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
													/>
													<span class="ml-2 text-sm"> 记住我 </span>
												</label>
											</div>

											<div class="text-center mt-6">
												<button
													class="bg-sky-400 text-white active:bg-sky-300 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
													type="button"
												>
													登录
												</button>
											</div>
											<div class="flex flex-wrap mt-6 relative">
												<div class="w-1/2">
													<a href="javascript:void(0)" class="text-blueGray-200">
														<small>忘记密码?</small>
													</a>
												</div>
												<div class="w-1/2 text-right">
													<router-link to="/auth/register" class="text-blueGray-200">
														<small>创建新用户</small>
													</router-link>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	</div>
</template>

<style lang="scss" scoped>
.login-img {
	background: url("https://s2.loli.net/2022/12/03/IDy14GA5ULO7jKJ.jpg");
	background-size: cover;
}
</style>
