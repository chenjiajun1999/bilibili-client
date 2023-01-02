<script setup lang="ts">
const isFocus = ref(false);
const searchFromDom = ref();
const searchDefault = ref("");
const searchValue = ref("");
const suggestShow = ref(false);

function input() {}
function focus() {}
function search(keyword?: any) {
	if (!(keyword instanceof Event) && keyword) {
		searchValue.value = keyword;
		suggestShow.value = false;
	}
}
</script>

<template>
	<div class="search-box" :class="{ isFocus }">
		<form class="search-from" :class="{ isFocus }" ref="searchFromDom" @submit.prevent @keypress.enter="search">
			<input
				class="search-input"
				type="text"
				autocomplete="off"
				:placeholder="searchDefault ? searchDefault : '搜索'"
				v-model="searchValue"
				@focus="focus"
				@input="input"
			/>
			<div class="search-btn" @click="search">
				<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M16.3451 15.2003C16.6377 15.4915 16.4752 15.772 16.1934 16.0632C16.15 16.1279 16.0958 16.1818 16.0525 16.2249C15.7707 16.473 15.4456 16.624 15.1854 16.3652L11.6848 12.8815C10.4709 13.8198 8.97529 14.3267 7.44714 14.3267C3.62134 14.3267 0.5 11.2314 0.5 7.41337C0.5 3.60616 3.6105 0.5 7.44714 0.5C11.2729 0.5 14.3943 3.59538 14.3943 7.41337C14.3943 8.98802 13.8524 10.5087 12.8661 11.7383L16.3451 15.2003ZM2.13647 7.4026C2.13647 10.3146 4.52083 12.6766 7.43624 12.6766C10.3517 12.6766 12.736 10.3146 12.736 7.4026C12.736 4.49058 10.3517 2.1286 7.43624 2.1286C4.50999 2.1286 2.13647 4.50136 2.13647 7.4026Z"
						fill="currentColor"
					></path>
				</svg>
			</div>
		</form>
	</div>
</template>

<style lang="scss" scoped>
.search-box {
	position: relative;
	width: 100%;
	min-width: 180px;
	max-width: 500px;
	margin: 0 auto;
	border-radius: 8px;
	&.isFocus {
		box-shadow: 0 0 30px #0000001a;
	}
	.isFocus {
		background-color: #ffffff !important;
		border-bottom: 0 !important;
		border-radius: 8px 8px 0 0 !important;
		opacity: 1 !important;
	}
	.search-panel {
		width: 100%;
		max-height: 612px;
		padding: 13px 0 16px;
		overflow-y: auto;
		background: #ffffff;
		border: 1px solid #e3e5e7;
		border-top: none;
		border-radius: 0 0 8px 8px;
		-webkit-font-smoothing: antialiased;
		@media screen and (max-width: 1500px) {
			.trendings-double {
				flex-direction: column !important;
				.trendings-col {
					width: 100% !important;
				}
			}
		}
		.header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 16px;
			.title {
				font-size: 16px;
				font-weight: normal;
			}
		}
		.history {
			.clear {
				font-size: 12px;
				color: #9499a0;
				&:hover {
					color: #00aeec;
				}
			}
			.histories-wrap {
				max-height: 170px;
				padding: 0 16px;
				overflow: hidden;
				.histories {
					display: flex;
					flex-wrap: wrap;
					margin-top: 12px;
					margin-right: -10px;
					margin-bottom: 4px;
					.history-item {
						position: relative;
						box-sizing: border-box;
						height: 30px;
						padding: 7px 10px 8px;
						margin-right: 10px;
						margin-bottom: 10px;
						font-size: 12px;
						line-height: 15px;
						color: #61666d;
						cursor: pointer;
						background: #f6f7f8;
						border-radius: 4px;
						&:hover {
							color: #00aeec;
							.item-close {
								display: block;
							}
						}
						.item-title {
							pointer-events: none;
						}
						.item-close {
							position: absolute;
							top: -3px;
							right: -3px;
							display: none;
							width: 11px;
							height: 11px;
							background-color: #cccccc;
							border-radius: 50%;
							&::after {
								position: absolute;
								top: 2px;
								left: 5px;
								width: 1px;
								height: 7px;
								content: "";
								background-color: #ffffff;
								transform: rotate(-45deg);
							}
							&::before {
								position: absolute;
								top: 2px;
								left: 5px;
								width: 1px;
								height: 7px;
								content: "";
								background-color: #ffffff;
								transform: rotate(45deg);
							}
						}
					}
				}
			}
		}
		.trending {
			.trendings-double {
				display: flex;
				.trendings-col {
					width: 50%;
					margin-right: 10px;
					.trendings-item {
						display: flex;
						align-items: center;
						height: 38px;
						padding-left: 16px;
						cursor: pointer;
						&:hover {
							background-color: #e3e5e7;
						}
						.rank-top {
							color: #18191c !important;
						}
						.trendings-rank {
							width: 15px;
							min-width: 15px;
							height: 17px;
							margin-right: 7px;
							font-size: 14px;
							line-height: 17px;
							color: #9499a0;
							text-align: center;
						}
						.trendings-title {
							height: 17px;
							margin-right: 6px;
							overflow: hidden;
							font-size: 14px;
							line-height: 17px;
							text-overflow: ellipsis;
							letter-spacing: 0;
							white-space: nowrap;
						}
						.trendings-icon {
							width: inherit;
							height: 14px;
							margin-right: 16px;
						}
					}
				}
			}
		}
		.suggestions {
			margin-top: -6px;
			margin-bottom: -6px;
			.suggest-item {
				position: relative;
				display: block;
				height: 32px;
				padding: 0 16px;
				margin-bottom: 4px;
				overflow: hidden;
				font-size: 14px;
				line-height: 32px;
				text-align: left;
				text-overflow: ellipsis;
				white-space: nowrap;
				cursor: pointer;
				&:hover {
					background-color: #e3e5e7;
				}
				.suggest_high_light {
					font-style: normal;
					color: #f25d8e;
				}
			}
		}
	}
	.search-from {
		position: relative;
		z-index: 1;
		display: block;
		height: 40px;
		padding: 0 48px 0 4px;
		overflow: hidden;
		line-height: 38px;
		background-color: #f1f2f3;
		border: 1px solid #e3e5e7;
		border-radius: 8px;
		opacity: 0.9;
		transition: background-color 0.2s;
		&:hover {
			background-color: #ffffff;
			opacity: 1;
		}
		&::before {
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
			width: 100%;
			height: 100%;
			content: "";
		}
		.search-input {
			width: 100%;
			height: 32px;
			padding-left: 8px;
			overflow: hidden;
			font-size: 14px;
			line-height: 20px;
			color: #61666d;
			background-color: transparent;
			border: 2px solid transparent;
			border-radius: 6px;
			box-shadow: none;
			&:focus {
				background-color: #e3e5e7;
			}
		}
		.search-btn {
			position: absolute;
			top: 3px;
			right: 7px;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 32px;
			height: 32px;
			padding: 0;
			margin: 0;
			line-height: 32px;
			color: #18191c;
			cursor: pointer;
			border: none;
			border-radius: 6px;
			transition: background-color 0.3s;
			&:hover {
				background-color: #e3e5e7;
			}
		}
	}
}
</style>
